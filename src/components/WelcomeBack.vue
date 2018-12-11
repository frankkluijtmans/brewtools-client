<template>
	<div>
		<h1>Welcome back {{ user }}!,</h1>
	</div>
</template>

<script>
export default {
	name: 'WelcomeBack',
	props: {
		user: String
	}
}
</script>

<style scoped lang="scss">
</style>
