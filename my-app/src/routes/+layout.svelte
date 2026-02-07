<script>
    import "../app.scss";
    import Button from "$lib/components/Button.svelte";
    import Gap from "$lib/components/Gap.svelte";
    import Column from "$lib/components/Column.svelte"
    import Row from "$lib/components/Row.svelte"
    import Link from "$lib/components/Link.svelte";
    import Dot from "$lib/components/Dot.svelte";
    import Waves from "$lib/components/Waves.svelte";
	import Icon from "$lib/components/Icon.svelte";
</script>

<main>
<slot/>
<nav>
	<Button href=".." style="primary-filled-dark" icon="home">Home</Button>
</nav>
<Waves type="bottom">
	<Column>
		<Row>
			<Link href="https://discord.gg/SQAU3UreHs" icon="discord">Discord</Link>
			<Dot/>
			<Link href="https://twitter.com/NoahhSDK" icon="twitter">Twitter</Link>
			<Dot/>
			<Link href="https://docs.noahh-sdk.org/" icon="docs">Documentation</Link>
			<Dot/>
			<Link href="https://github.com/noahh-sdk" icon="github">Source Code</Link>
		</Row>
		<p class="text-text-950">
			Site made by <Link href="https://github.com/nipfswd">NoahBajsToa</Link>.
			Thank you to <Link href="https://github.com/torvalds">Linus Torvalds</Link> for the domain!
		</p>
		<Row gap=small>
			<Icon icon="copyright"/> 
			<p>Noahh Team 2024</p>
		</Row>
	</Column>
</Waves>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		gap: var(--gap-large);
		min-height: calc(100vh - var(--page-margin) * 2);
	}
	nav {
		position: fixed;
		top: 1rem;
		left: 1rem;
	}
</style>