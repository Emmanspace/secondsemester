import {createPinia, defineStore } from 'pinia'
// import {fetchWrapper} from '@/helpers'


export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        users: {},
        user: {}
    }),

    actions: {
      
        initStore() {
            this.user.isAuthenticated = false
            
            const storedToken = localStorage.getItem('user.token')
            const storedEmail = localStorage.getItem('user.email')
            // added
            // const storedFirstName = localStorage.getItem('user.first_name')
            // const storedLastName = localStorage.getItem('user.last_name')
            // const storedPlate = localStorage.getItem('user.plate')
            // // end of added

            if (localStorage.getItem('user.token')) {
                this.user.token = localStorage.getItem('user.token')
                this.user.email = localStorage.getItem('user.email')
                // // added
                // this.user.first_name = localStorage.getItem('user.first_name')
                // this.user.last_name = localStorage.getItem('user.last_name')
                // this.user.plate = localStorage.getItem('user.plate')
                // // end of added
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

            // // added
            // this.user.first_name = first_name
            // this.user.last_name = last_name
            // this.user.plate = plate
            // end of added
            this.user.isAuthenticated = true
            // Cookies.set('token', token, { expires: 7 }); // Set expiry to 7 days


            localStorage.setItem('user.token', token)
            localStorage.setItem('user.email', email)
            // added
            // localStorage.setItem('user.first_name', first_name)
            // localStorage.setItem('user.last_name', last_name)
            // localStorage.setItem('user.plate', plate)
        },
        removeToken() {
            console.log('removeToken')

            this.user.token = null
            this.user.email = null
            this.token = null
            this.email = null
            this.user.isAuthenticated = false
            // Cookies.remove('token')


            localStorage.removeItem('user.token')
            localStorage.removeItem('user.email')
            localStorage.removeItem('email')
            localStorage.removeItem('token')
        },
        setUser(userData){
            this.user = {
                ...this.user,
                ...userData
            }
        }
    },
    // plugins: [createPersistedState()],

})

const pinia = createPinia()
export default pinia