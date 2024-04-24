import {createPinia, defineStore } from 'pinia'
import {createPersistedState} from 'pinia-plugin-persistedstate'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: {
            isAuthenticated: false,
            email: null,
            token: null,
            first_name: null, //added
            last_name: null, //added
        }
    }),

    actions: {
        initStore() {
            this.user.isAuthenticated = false
            
            const storedId = localStorage.getItem('user.id') 
            const storedToken = localStorage.getItem('user.token')
            const storedEmail = localStorage.getItem('user.email')

            if (localStorage.getItem('user.token')) {
                this.user.token = localStorage.getItem('user.token')
                this.user.email = localStorage.getItem('user.email')
                this.user.isAuthenticated = true

                console.log('Initalized user:', this.user)
            }

            if (storedToken && storedEmail){
                this.setUser({
                    // id : storedId,
                    token: storedToken,
                    email: storedEmail,
                    isAuthenticated : true,
                })
               }
        },
        setToken(token, email) {
            console.log('setToken', token, email)

            this.user.token = token
            this.user.email = email
            this.user.isAuthenticated = true
            // Cookies.set('token', token, { expires: 7 }); // Set expiry to 7 days


            localStorage.setItem('user.token', token)
            localStorage.setItem('user.email', email)
        },
        removeToken() {
            console.log('removeToken')

            this.user.token = null
            this.user.email = null
            this.user.isAuthenticated = false
            // Cookies.remove('token')


            localStorage.setItem('user.token', '')
            localStorage.setItem('user.email', '')
        },
        setUser(userData){
            this.user = {
                ...this.user,
                ...userData
            }
        }
    },
    plugins: [createPersistedState()],

})

const pinia = createPinia()
export default pinia