export interface SiteSettings {
  siteName: string
  siteKeywords: string
  siteDescription: string
  icpNumber: string
}

// 默认值
const defaultSettings: SiteSettings = {
  siteName: '',
  siteKeywords: '',
  siteDescription: '',
  icpNumber: '',
}

export function useSiteSettings() {
  // 使用 useState 在整个应用中共享状态
  const settings = useState<SiteSettings>('siteSettings', () => defaultSettings)
  const isLoaded = useState<boolean>('siteSettingsLoaded', () => false)

  // 获取设置
  async function fetchSettings() {
    if (isLoaded.value)
      return settings.value

    try {
      const data = await $fetch<SiteSettings>('/api/settings')
      settings.value = data
      isLoaded.value = true
    }
    catch (error) {
      console.error('获取网站设置失败:', error)
    }

    return settings.value
  }

  return {
    settings,
    isLoaded,
    fetchSettings,
  }
}

