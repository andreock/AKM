<page>
    <flexboxLayout flexDirection="column" >
        <label text="SDA: {current_sda_scheduler}" />
        <button text="Change current scheduler" on:tap="{click_change}" backgroundColor="#2497d1" />
        <label text="SDB: {current_sdb_scheduler}" />
        <button text="Change current scheduler" on:tap="{click_change}" backgroundColor="#2497d1" />
    </flexboxLayout>
</page>

<script lang="ts">

import { get_scheduler, set_scheduler } from '../lib/io_scheduler';
import { onMount } from 'svelte';
import { action } from '@nativescript/core/ui/dialogs'

let sda_scheduler: string, current_sda_scheduler: string, sdb_scheduler: string ,current_sdb_scheduler: string;

function click_change(){
    action('Select the I/O scheduler', 'Cancel',  sda_scheduler.split(" "))
    .then(result => {
        set_scheduler("sda", result);
    })    

}

onMount(() => {
    sda_scheduler = String(get_scheduler("sda"));
    // @ts-ignore
    current_sda_scheduler = sda_scheduler.match(/\[(.*?)\]/)[1];    // Get the Scheduler in brackets
    sdb_scheduler = String(get_scheduler("sdb"));
    // @ts-ignore
    current_sdb_scheduler = sdb_scheduler.match(/\[(.*?)\]/)[1];
});

</script>

<style>
    label{
        margin-left: 30px;
        margin-top: 15px;
    }
</style>