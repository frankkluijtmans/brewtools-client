<template>
	<PageError :type="'not_found'" />
</template>

<script>
import PageError from '../components/UI/PageError';

export default {
	name: 'NotFound',
	components: {
		PageError
	}
}
</script>