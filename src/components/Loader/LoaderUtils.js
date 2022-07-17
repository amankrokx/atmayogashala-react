class LoaderUtils {
    #loader = {
        s: true,
        h: () => {},
    }

    setLoader(loading, setLoading) {
        this.#loader.s = loading
        this.#loader.h = setLoading
    }

    open() {
        this.#loader.h(false)
    }
    close() {
        this.#loader.h(true)
    }
    toggle() {
        this.#loader.h(!this.#loader.s)
    }
}

export default new LoaderUtils()
