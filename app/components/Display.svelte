<page>
    <textView editable="{false}">
        <formattedString>
            <span text="Width: {display_info.widthInPixels}px\n" />
            <span text="\n"/>
            <span text="Height: {display_info.heightInPixels}px\n " fontWeight="Bold" />
            <span text="\n"/>
            <span text="Brightnesslevl: {brightlevel}" />
    </textView>
</page>

<script>
    import { DeviceInfo } from "nativescript-dna-deviceinfo";
    import { onMount } from 'svelte';
    let display_info = {}, brightlevel = 0;
    onMount(() => {
        brightlevel = DeviceInfo.screenBrightnessLevel();
        display_info = DeviceInfo.displayMetrics();
        //DeviceInfo.setScreenBrightnessLevel(0.8);
    });
</script>