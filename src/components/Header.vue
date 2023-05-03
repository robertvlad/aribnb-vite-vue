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
                    <router-link class="navbar-brand" :to="{ name: 'homepage'}">
                        <img src="../../public/img/BOOLBNB-removebg-ok.png" alt="logo" width="160">
                    </router-link>
                </div>
                <div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="http://127.0.0.1:8000/admin" role="button" aria-expanded="false">
                                <i class="fas fa-user"></i>
                                </a>
                            </li>
                            <li class="nav-item" v-for="(item, index) in menuItems" :key="index">
                                <router-link :to="{name: item.routeName}" class="nav-link">
                                    {{ item.label }}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>

header{
    position: sticky;
    top: 0;
    z-index: 3;
}
.navbar .nav-link{
    color: black;

    &:hover{
        color: rgb(255, 56, 92);
    }
}
</style>
