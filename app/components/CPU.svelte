<page>
    <actionBar title="AndreKernelManager" />
    <flexboxLayout flexDirection="column">
        <listPicker items="{get_gov(0)}" bind:selectedIndex="{allgov}"/>
        <button text="Set governor for all CPUs" backgroundColor="#2497d1" on:tap="{set_all_gov(allgov)}" height="170"/>
        <listView items="{frequency}">
            <Template let:item>
                <label text="CPU {item.id} Max: {item.max} Min: {item.min} Current: {item.current}" />
                <button text="Adjust maximium frequncy" backgroundColor="#2497d1" on:tap="{set_max_freq(item.min, item.max, item.id)}"/>
                <button text="Adjust minimium frequncy" backgroundColor="#2497d1" on:tap="{set_min_freq(item.min, item.max, item.id)}"/>
                <listPicker items="{get_gov(item.id)}" bind:selectedIndex="{governor}"/>
                <button text="Set governor" backgroundColor="#2497d1" on:tap="{set_gov(item.id, governor)}"/>
            </Template>
        </listView>
    </flexboxLayout>
</page>

<script lang="ts">
    import { Template } from 'svelte-native/components';
    import { set_all_gov, set_max_freq, set_min_freq, set_gov, get_gov, get_cpu_max_freq, get_cpu_min_freq, get_cpu_freq } from '../lib/cpu';


    let frequency: Array<CPU> = [], governor = 0, allgov = 0;

    function init(){
        frequency = [];
        for(var i = 0; i < 8; i++){
            frequency = frequency.concat({
                id: i,
                max: get_cpu_max_freq(i), 
                min: get_cpu_min_freq(i),
                current: get_cpu_freq(i)
            });
        }
        setTimeout(init, 1000);
    }

    init();
</script>

<style>
</style>
