<page>
    <flexboxLayout flexDirection="column">
        <textView editable="{false}">
            <formattedString>
                <span text="Width: {display_info.widthInPixels}px\n" />
                <span text="\n"/>
                <span text="Height: {display_info.heightInPixels}px\n " fontWeight="Bold" />
                <span text="\n"/>
                <span text="Brightnesslevl: {brightlevel}" />
        </textView>
        <slider bind:value="{brightlevel}" minValue=0 maxValue=100/>
        <button text="Set brightness" on:tap="{set_brightness}" backgroundColor="#2497d1" />
    </flexboxLayout>
</page>

<script>
    import { DeviceInfo } from "nativescript-dna-deviceinfo";
    import { onMount } from 'svelte';
    // import { Brightness } from '@nativescript/brightness';

    // const brightness = new Brightness();
    let display_info = {}, brightlevel = 0;

    function set_brightness(){
        // brightness.set({
        //     intensity: 25
        // })
    }

    onMount(() => {
        //brightlevel = brightness.get();
        display_info = DeviceInfo.displayMetrics();
    });

</script>