<script>
export default {
    name: 'NotFound'
}
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col text-center">
                <h2>Page not found</h2>
                <router-link :to="{name: 'homepage'}" class="btn btn-primary">
                    Back to Homepage
                </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    
</style>