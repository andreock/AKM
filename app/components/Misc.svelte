<page>
    <flexboxLayout flexDirection="column">

        <flexboxLayout alignItems="flex-start">
            <label text="USB2 fast charge" class="fsync"/>
            <switch bind:checked="{fsync}" on:checkedChange={fsync_switch}/>
        </flexboxLayout>

        <flexboxLayout alignItems="flex-start">
            <label text="Enable 600hz touch sampling(only oplus)" class="fsync"/>
            <switch bind:checked="{touchrate}" on:checkedChange={touchrate_switch}/>
        </flexboxLayout>


    </flexboxLayout>
</page>

<script lang="ts">
    
    import { onMount } from 'svelte';
    import { get_oplus_touchrate, touchrate_switch, fsync_switch } from '../lib/misc';

    let fsync = false, touchrate = false;


    // java.lang.Runtime.getRuntime().exec('su') Get SU permission

    onMount(() => {
        // Inizialize the switch
        touchrate = Boolean(parseInt(get_oplus_touchrate().charAt(0)));
    }
    );
    
</script>

<style>
    .fsync{
        margin-top: 50px;
        margin-left: 20px;
    }
</style>