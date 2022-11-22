import 'dotenv/config'

export default{
  expo: {
    name: 'PayBook',
    slug: 'paybook-app',
    version: '1.0.6',
    orientation: 'portrait',
    icon: './assets/icons/icon.png',
    scheme: 'miapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/imgs/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      '**/*'
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.gjdevelopment.paybookmobile'
    },
    android: {
      package: 'com.gjdevelopment.paybookmobile',
      versionCode: 7,
      adaptiveIcon: {
        foregroundImage: './assets/icons/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
    },
    web: {
      favicon: './assets/icons/icon.png'
    },
    extra: {
      baseUrl: process.env.BASE_URL,
      googleExpoId: process.env.GOOGLE_EXPO_CLIENT,
      googleIosId: process.env.GOOGLE_IOS_CLIENT,
      googleAndroidId: process.env.GOOGLE_ANDROID_CLIENT,
      revenueApiKey: process.env.REVENUE_API_KEY,
      eas: {
        projectId: "6caf4f6e-03a0-451c-9d97-1f3b0d5326b5"
      }
    },
  }
}
