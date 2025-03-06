import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'btn': 'inline-block p-2 bg-blue-500 text-white rounded',
    'btn-primary': 'p-2 bg-blue-500 text-white rounded',
    'btn-secondary': 'p-2 bg-gray-500 text-white rounded',
    'btn-danger': 'p-2 bg-red-500 text-white rounded',
    'btn-success': 'p-2 bg-green-500 text-white rounded',
    'btn-warning': 'p-2 bg-yellow-500 text-white rounded',
  },
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})