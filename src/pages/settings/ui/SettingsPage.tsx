import React, {useState, useEffect} from "react"
import {
    useGetCurrentUserQuery,
    useUpdateProfileMutation,
    useGetPreferencesQuery,
    useUpdatePreferencesMutation,
    useGetNotificationSettingsQuery,
    useUpdateNotificationSettingsMutation,
    useGetSecuritySettingsQuery,
    useUpdateSecuritySettingsMutation,
    useGetApiKeysQuery,
    useCreateApiKeyMutation,
    useDeleteApiKeyMutation,
    useToggleApiKeyMutation,
    useEnableTwoFactorMutation,
    useDisableTwoFactorMutation,
    useVerifyTwoFactorMutation,
    useChangePasswordMutation,
    useGetTrustedDevicesQuery,
    useRemoveTrustedDeviceMutation,
} from "@entities/settings/api/settingsApi"
import type {ThemeMode, Language} from "@entities/settings/model/types"
import styles from "./SettingsPage.module.scss"

type TabType = 'profile' | 'notifications' | 'security' | 'api'

export const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('profile')
    const [apiKeysPage] = useState(1)

    const { data: user, isLoading: userLoading } = useGetCurrentUserQuery()
    const { data: preferences, isLoading: preferencesLoading } = useGetPreferencesQuery()
    const [updateProfile] = useUpdateProfileMutation()
    const [updatePreferences] = useUpdatePreferencesMutation()

    const { data: notifications, isLoading: notificationsLoading } = useGetNotificationSettingsQuery()
    const [updateNotifications] = useUpdateNotificationSettingsMutation()
    const { data: security, isLoading: securityLoading } = useGetSecuritySettingsQuery()
    const [updateSecurity] = useUpdateSecuritySettingsMutation()
    const [enableTwoFactor] = useEnableTwoFactorMutation()
    const [disableTwoFactor] = useDisableTwoFactorMutation()
    const [verifyTwoFactor] = useVerifyTwoFactorMutation()
    const [changePassword] = useChangePasswordMutation()

    const { data: apiKeys, refetch: refetchApiKeys } = useGetApiKeysQuery({
        page: apiKeysPage,
        limit: 10,
    })
    const [createApiKey] = useCreateApiKeyMutation()
    const [deleteApiKey] = useDeleteApiKeyMutation()
    const [toggleApiKey] = useToggleApiKeyMutation()

    const { data: devices, refetch: refetchDevices } = useGetTrustedDevicesQuery()
    const [removeDevice] = useRemoveTrustedDeviceMutation()

    const [profileForm, setProfileForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    })

    const [preferencesForm, setPreferencesForm] = useState<{
        theme: ThemeMode
        language: Language
        timeFormat: '12h' | '24h'
        itemsPerPage: number
    }>({
        theme: 'dark',
        language: 'ru',
        timeFormat: '24h',
        itemsPerPage: 20,
    })

    const [passwordForm, setPasswordForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    })

    const [twoFactorCode, setTwoFactorCode] = useState('')
    const [showTwoFactorVerify, setShowTwoFactorVerify] = useState(false)

    useEffect(() => {
        if (user) {
            setProfileForm({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phone: user.phone || '',
            })
        }
    }, [user])

    useEffect(() => {
        if (preferences) {
            setPreferencesForm({
                theme: preferences.theme,
                language: preferences.language,
                timeFormat: preferences.timeFormat,
                itemsPerPage: preferences.itemsPerPage,
            })
        }
    }, [preferences])

    const handleSaveProfile = async () => {
        await updateProfile(profileForm)
        await updatePreferences(preferencesForm)
    }

    const handleSaveNotifications = async () => {
        if (notifications) {
            await updateNotifications(notifications)
        }
    }

    const handleSaveSecurity = async () => {
        if (security) {
            await updateSecurity(security)
        }
    }

    const handleCreateApiKey = async () => {
        const name = prompt('Введите название ключа:')
        if (!name) return

        await createApiKey({ name, permissions: ['read'] })
        refetchApiKeys()
    }

    const handleDeleteApiKey = async (id: string) => {
        if (confirm('Удалить API ключ? Это действие необратимо.')) {
            await deleteApiKey(id)
            refetchApiKeys()
        }
    }

    const handleToggleApiKey = async (id: string) => {
        await toggleApiKey(id)
        refetchApiKeys()
    }

    const handleEnableTwoFactor = async () => {
        const result = await enableTwoFactor({ method: 'app' })
        if (result.data?.success) {
            setShowTwoFactorVerify(true)
        }
    }

    const handleVerifyTwoFactor = async () => {
        const result = await verifyTwoFactor({ code: twoFactorCode })
        if (result.data?.success) {
            setShowTwoFactorVerify(false)
            setTwoFactorCode('')
        }
    }

    const handleDisableTwoFactor = async () => {
        if (confirm('Отключить двухфакторную аутентификацию?')) {
            await disableTwoFactor()
        }
    }

    const handleChangePassword = async () => {
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            alert('Пароли не совпадают')
            return
        }

        const result = await changePassword({
            oldPassword: passwordForm.oldPassword,
            newPassword: passwordForm.newPassword,
        })

        if (result.data?.success) {
            alert('Пароль успешно изменен')
            setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' })
        }
    }

    const handleRemoveDevice = async (id: string) => {
        if (confirm('Отозвать доступ этого устройства?')) {
            await removeDevice(id)
            refetchDevices()
        }
    }

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPreferencesForm({
            ...preferencesForm,
            theme: e.target.value as ThemeMode
        })
    }

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPreferencesForm({
            ...preferencesForm,
            language: e.target.value as Language
        })
    }

    const handleTimeFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPreferencesForm({
            ...preferencesForm,
            timeFormat: e.target.value as '12h' | '24h'
        })
    }

    if (userLoading || preferencesLoading || notificationsLoading || securityLoading) {
        return <div className={styles.loading}>Загрузка настроек...</div>
    }

    return (
        <div className={styles.settingsPage}>
            <h1 className={styles.pageTitle}>Настройки</h1>
            <p className={styles.pageSubtitle}>Управление профилем и параметрами системы</p>

            <div className={styles.tabsNav}>
                <button
                    className={`${styles.tabButton} ${activeTab === 'profile' ? styles.active : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    Профиль
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'notifications' ? styles.active : ''}`}
                    onClick={() => setActiveTab('notifications')}
                >
                    Уведомления
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'security' ? styles.active : ''}`}
                    onClick={() => setActiveTab('security')}
                >
                    Безопасность
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'api' ? styles.active : ''}`}
                    onClick={() => setActiveTab('api')}
                >
                    API ключи
                </button>
            </div>

            {activeTab === 'profile' && (
                <>
                    <div className={styles.settingsSection}>
                        <div className={styles.sectionHeader}>
                            <h2>Профиль пользователя</h2>
                        </div>

                        <div className={styles.avatarSection}>
                            <div className={styles.avatar}>
                                {user?.firstName?.[0]}{user?.lastName?.[0]}
                            </div>
                            <div className={styles.avatarUpload}>
                                <button>Изменить аватар</button>
                            </div>
                        </div>

                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label>Имя</label>
                                <input
                                    type="text"
                                    value={profileForm.firstName}
                                    onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Фамилия</label>
                                <input
                                    type="text"
                                    value={profileForm.lastName}
                                    onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={profileForm.email}
                                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Телефон</label>
                                <input
                                    type="tel"
                                    value={profileForm.phone}
                                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className={styles.sectionHeader} style={{ marginTop: 32 }}>
                            <h2>Предпочтения</h2>
                        </div>

                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label>Тема</label>
                                <select
                                    value={preferencesForm.theme}
                                    onChange={handleThemeChange}
                                >
                                    <option value="dark">Темная</option>
                                    <option value="light">Светлая</option>
                                    <option value="system">Системная</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Язык</label>
                                <select
                                    value={preferencesForm.language}
                                    onChange={handleLanguageChange}
                                >
                                    <option value="ru">Русский</option>
                                    <option value="en">English</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Формат времени</label>
                                <select
                                    value={preferencesForm.timeFormat}
                                    onChange={handleTimeFormatChange}
                                >
                                    <option value="24h">24 часа</option>
                                    <option value="12h">12 часов (AM/PM)</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Элементов на странице</label>
                                <input
                                    type="number"
                                    value={preferencesForm.itemsPerPage}
                                    onChange={(e) => setPreferencesForm({
                                        ...preferencesForm,
                                        itemsPerPage: parseInt(e.target.value)
                                    })}
                                    min="10"
                                    max="100"
                                />
                            </div>
                        </div>

                        <div className={styles.formActions}>
                            <button className={styles.cancelButton}>Отмена</button>
                            <button className={styles.saveButton} onClick={handleSaveProfile}>
                                Сохранить изменения
                            </button>
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'notifications' && notifications && (
                <div className={styles.settingsSection}>
                    <div className={styles.sectionHeader}>
                        <h2>Настройки уведомлений</h2>
                    </div>

                    <div className={styles.toggleGroup}>
                        <div className={styles.toggleLabel}>
                            Email уведомления
                            <div className={styles.toggleDescription}>Получать уведомления на email</div>
                        </div>
                        <label className={styles.toggle}>
                            <input
                                type="checkbox"
                                checked={notifications.email.level !== 'none'}
                                onChange={(e) => {
                                    notifications.email.level = e.target.checked ? 'important' : 'none'
                                }}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>

                    <div className={styles.toggleGroup}>
                        <div className={styles.toggleLabel}>
                            Push уведомления
                            <div className={styles.toggleDescription}>Мгновенные уведомления в браузере</div>
                        </div>
                        <label className={styles.toggle}>
                            <input
                                type="checkbox"
                                checked={notifications.push.enabled}
                                onChange={(e) => {
                                    notifications.push.enabled = e.target.checked
                                }}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>

                    <div className={styles.toggleGroup}>
                        <div className={styles.toggleLabel}>
                            Критические алерты
                            <div className={styles.toggleDescription}>Немедленные уведомления о критических событиях</div>
                        </div>
                        <label className={styles.toggle}>
                            <input
                                type="checkbox"
                                checked={notifications.email.criticalAlerts}
                                onChange={(e) => {
                                    notifications.email.criticalAlerts = e.target.checked
                                }}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>

                    <div className={styles.toggleGroup}>
                        <div className={styles.toggleLabel}>
                            Еженедельный дайджест
                            <div className={styles.toggleDescription}>Сводка событий за неделю</div>
                        </div>
                        <label className={styles.toggle}>
                            <input
                                type="checkbox"
                                checked={notifications.email.weeklyDigest}
                                onChange={(e) => {
                                    notifications.email.weeklyDigest = e.target.checked
                                }}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>

                    <div className={styles.formActions}>
                        <button className={styles.cancelButton}>Отмена</button>
                        <button className={styles.saveButton} onClick={handleSaveNotifications}>
                            Сохранить изменения
                        </button>
                    </div>
                </div>
            )}

            {activeTab === 'security' && security && (
                <>
                    <div className={styles.settingsSection}>
                        <div className={styles.sectionHeader}>
                            <h2>Безопасность</h2>
                        </div>

                        <div className={styles.toggleGroup}>
                            <div className={styles.toggleLabel}>
                                Двухфакторная аутентификация
                                <div className={styles.toggleDescription}>
                                    Дополнительная защита аккаунта
                                </div>
                            </div>
                            {!security.twoFactor.enabled ? (
                                <button onClick={handleEnableTwoFactor}>Включить 2FA</button>
                            ) : (
                                <div>
                                    {showTwoFactorVerify ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={twoFactorCode}
                                                onChange={(e) => setTwoFactorCode(e.target.value)}
                                                placeholder="Введите код"
                                            />
                                            <button onClick={handleVerifyTwoFactor}>Подтвердить</button>
                                        </div>
                                    ) : (
                                        <button onClick={handleDisableTwoFactor}>Отключить 2FA</button>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className={styles.toggleGroup}>
                            <div className={styles.toggleLabel}>
                                Уведомления о входе
                                <div className={styles.toggleDescription}>
                                    Получать уведомления при входе в аккаунт
                                </div>
                            </div>
                            <label className={styles.toggle}>
                                <input
                                    type="checkbox"
                                    checked={security.loginNotifications}
                                    onChange={(e) => {
                                        security.loginNotifications = e.target.checked
                                    }}
                                />
                                <span className={styles.slider}></span>
                            </label>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Таймаут сессии (минуты)</label>
                            <input
                                type="number"
                                value={security.sessionTimeout}
                                onChange={(e) => {
                                    security.sessionTimeout = parseInt(e.target.value)
                                }}
                                min="5"
                                max="480"
                            />
                            <div className={styles.helpText}>
                                Время бездействия после которого сессия будет завершена
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Максимальное количество одновременных сессий</label>
                            <input
                                type="number"
                                value={security.maxSessions}
                                onChange={(e) => {
                                    security.maxSessions = parseInt(e.target.value)
                                }}
                                min="1"
                                max="10"
                            />
                        </div>
                    </div>

                    <div className={styles.settingsSection}>
                        <div className={styles.sectionHeader}>
                            <h2>Смена пароля</h2>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Старый пароль</label>
                            <input
                                type="password"
                                value={passwordForm.oldPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Новый пароль</label>
                            <input
                                type="password"
                                value={passwordForm.newPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Подтверждение пароля</label>
                            <input
                                type="password"
                                value={passwordForm.confirmPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                            />
                        </div>

                        <button onClick={handleChangePassword}>Изменить пароль</button>
                    </div>

                    <div className={styles.settingsSection}>
                        <div className={styles.sectionHeader}>
                            <h2>Доверенные устройства</h2>
                            <span className={styles.sectionBadge}>{devices?.length || 0}</span>
                        </div>

                        <div className={styles.devicesList}>
                            {devices?.map(device => (
                                <div key={device.id} className={styles.deviceCard}>
                                    <div className={styles.deviceName}>{device.name}</div>
                                    <div className={styles.deviceIp}>{device.ip}</div>
                                    <div className={styles.deviceLastUsed}>
                                        Последнее использование: {new Date(device.lastUsed).toLocaleDateString()}
                                    </div>
                                    <button onClick={() => handleRemoveDevice(device.id)}>
                                        Отозвать доступ
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.formActions}>
                        <button className={styles.cancelButton}>Отмена</button>
                        <button className={styles.saveButton} onClick={handleSaveSecurity}>
                            Сохранить изменения
                        </button>
                    </div>
                </>
            )}

            {activeTab === 'api' && (
                <div className={styles.settingsSection}>
                    <div className={styles.sectionHeader}>
                        <h2>API ключи</h2>
                        <span className={styles.sectionBadge}>{apiKeys?.total || 0}</span>
                    </div>

                    <div className={styles.apiKeysList}>
                        {apiKeys?.items.map(key => (
                            <div key={key.id} className={styles.apiKeyItem}>
                                <div className={styles.apiKeyInfo}>
                                    <div className={styles.apiKeyName}>{key.name}</div>
                                    <div className={styles.apiKeyValue}>{key.key}</div>
                                    <div className={styles.apiKeyMeta}>
                                        <span>Создан: {new Date(key.createdAt).toLocaleDateString()}</span>
                                        <span className={key.isActive ? styles.active : styles.inactive}>
                                            {key.isActive ? 'Активен' : 'Неактивен'}
                                        </span>
                                        {key.lastUsed && (
                                            <span>Последнее использование: {new Date(key.lastUsed).toLocaleDateString()}</span>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.apiKeyActions}>
                                    <button onClick={() => handleToggleApiKey(key.id)}>
                                        {key.isActive ? 'Деактивировать' : 'Активировать'}
                                    </button>
                                    <button className={styles.delete} onClick={() => handleDeleteApiKey(key.id)}>
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className={styles.createKeyButton} onClick={handleCreateApiKey}>
                        + Создать новый API ключ
                    </button>
                </div>
            )}
        </div>
    )
}