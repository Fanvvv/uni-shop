<template>
	<view>
		<my-login v-if="!token"></my-login>
    <my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
  import { mapState } from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
    computed: {
      ...mapState('user', ['token'])
    }
	}
</script>

<style lang="scss">

</style>
