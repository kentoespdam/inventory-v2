import { createApp, h } from 'react'
import { createInertiaApp } from '@inertiajs/react'

createInertiaApp({
    resolve: (name) => `./Pages/${name}.tsx`,
    setup({ el, App, props }) {
        createApp({ render: () => h(App, props) }).mount(el)
    },
})