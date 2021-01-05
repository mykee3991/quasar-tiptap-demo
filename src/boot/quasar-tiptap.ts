import { QuasarTiptapPlugin } from 'quasar-tiptap'

export default async ({ Vue }: { Vue: any }) => {
  Vue.use(QuasarTiptapPlugin, {
    language: 'en-us',
    spellcheck: true
  })
}

