<page>
    <flexboxLayout flexDirection="column">

        <label textWrap="{true}" class="text">
            <formattedString>
                <span text="GPU Load: {load} %\n" />
                <span text="Current governor: {current_gov}\n" />
                <span text="Current frequency: {current_freq} mHz" />
            </formattedString>
        </label>

        <flexboxLayout alignItems="flex-start">
            <label text="Adrenoboost" class="icon_text"/>
            <switch bind:checked="{adrenoboost}" on:checkedChange={set_adrenoboost(adrenoboost)} class="fsync"/>
        </flexboxLayout>

        <listPicker items="{governors}" selectedIndex="0" on:selectedIndexChange="{selectedIndexChanged}" />
        <button text="Set governor" backgroundColor="#2497d1" on:tap="{set_gov(governor)}"/>
        <button text="Set max frequency" backgroundColor="#2497d1" on:tap="{set_min_freq(min, max)}"/>
        <button text="Set max frequency" backgroundColor="#2497d1" on:tap="{set_max_freq(min, max)}"/>


    </flexboxLayout>
</page>

<script lang="ts">
    import { onMount } from 'svelte';
    // @ts-ignore
    import { get_adrenoboost, set_adrenoboost, get_load, get_gov, get_all_gov, set_gov, get_min_freq, get_max_freq, get_cur_freq, set_min_freq, set_max_freq } from '../lib/gpu.ts';

    let load = 0, current_gov = 0, adrenoboost = false, governors: Array<string> = [], governor = 0, current_freq = 0, min = 0, max = 0;

    const selectedIndexChanged = (e: any) => governor = e.index;

    function load_refresh(){
        load = get_load();
        current_freq = get_cur_freq() / 1000000;
        setTimeout(load_refresh, 1000);
    }

    onMount(() => {
        load_refresh();
        governors = get_all_gov();
        current_gov = get_gov();
        adrenoboost = Boolean(parseInt(get_adrenoboost()));
        min = get_min_freq();
        max = get_max_freq();
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
    .text{
        margin-top: 20px;
        margin-left: 50px;
    }
</style>