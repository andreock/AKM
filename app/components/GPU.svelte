<page>
    <flexboxLayout flexDirection="column">

        <textView editable="{false}">
            <formattedString>
                <span text="GPU Load: {load} %\n" />
                <span text="Current governor: {current_gov}\n" />
            </formattedString>
        </textView>

        <flexboxLayout alignItems="flex-start">
            <label text="Adrenoboost" class="icon_text"/>
            <switch bind:checked="{adrenoboost}" on:checkedChange={set_adrenoboost(adrenoboost)} class="fsync"/>
        </flexboxLayout>
        
        <!-- <flexboxLayout alignItems="flex-start">
            <label text="Enable 600hz touch sampling(only oplus)" class="fsync"/>
            <switch bind:checked="{touchrate}" on:checkedChange={touchrate_switch}/>
        </flexboxLayout>

        <flexboxLayout alignItems="flex-start">
            <label text="Adrenoboost" class="fsync"/>
            <switch bind:checked="{adrenoboost}" on:checkedChange={set_adrenoboost}/>
        </flexboxLayout> -->
        
    </flexboxLayout>
</page>

<script lang="ts">
    import { onMount } from 'svelte';
    // @ts-ignore
    import { get_adrenoboost, set_adrenoboost, get_load, get_gov } from '../lib/gpu.ts';

    let load = 0, current_gov = 0, adrenoboost = false;

    function load_refresh(){
        load = get_load();
        setTimeout(load_refresh, 1000);
    }

    onMount(() => {
        load_refresh();
        current_gov = get_gov();
        adrenoboost = Boolean(parseInt(get_adrenoboost()));
    });
</script>

<style>
    .fsync{
        margin-bottom: 200px;
    }
    .icon_text{
        margin-left: 50px;
        margin-top: 50px;
    }
</style>