export const waitForSeconds = (seconds: number): Promise<void> =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 1000 * seconds)
    })

// waitForSeconds es una promesa que tarda x segundos en resolverse