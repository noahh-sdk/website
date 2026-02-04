<script lang="ts">
    type Type = 'circle' | 'plain' | 'plain-mono';
    export let type: Type;

    let svgFileName;
    switch (type) {
        case 'circle':     svgFileName = 'noahh-logo'; break;
        case 'plain':      svgFileName = 'noahh-logo-plain'; break;
        case 'plain-mono': svgFileName = 'noahh-logo-plain-mono'; break;
    }
</script>

<div class="noahh-logo">
    {#await import(`../assets/${svgFileName}.svg?raw`) then svg}
        {@html svg.default}
    {/await}
</div>

<style is:global>
    .noahh-logo {
        display: flex;
        height: var(--font-size-title);
        fill: var(--text-50);
    }
    .noahh-logo > :global(svg) {
        width: 100%;
        height: 100%;
        filter: drop-shadow(0px 0px 3rem var(--primary-700));
    }
</style>
