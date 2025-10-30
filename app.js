const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        console.log('Registering SW...');

        navigator.serviceWorker
            .register('/sw.js')
            .then((regis) => console.log('SW Registered', regis))
            .catch((e) => console.log('SW Failed with ', e.message))
    }
}

registerServiceWorker();
