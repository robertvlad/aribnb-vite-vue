<script>
export default{
    name: 'Header',
    data() {
        return {
            menuItems: [
                {
                    label: 'Homepage',
                    routeName: 'homepage',
                },
                {
                    label: 'About Us',
                    routeName: 'about_us',
                },
                
            ]
        }
    },
}
</script>

<template>
    <header>
        <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
                <div>
                    <a class="navbar-brand" href="#">
                        <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c513.png" alt="logo" width="200">
                    </a>
                </div>
                <div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item" v-for="(item, index) in menuItems" :key="index">
                                <router-link :to="{name: item.routeName}" class="nav-link">
                                    {{ item.label }}
                                </router-link>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Login
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">User</a></li>
                                    <li><a class="dropdown-item" href="#">Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>

   
</style>
