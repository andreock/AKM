<tabView>
    <tabViewItem title="Summary">
      <Home />
    </tabViewItem>
  
    <tabViewItem title="CPU">
      <CPU />
    </tabViewItem>

    <tabViewItem title="GPU">
      <GPU />
    </tabViewItem>

    <tabViewItem title="Battery">
      <Battery />
    </tabViewItem>

    <tabViewItem title="Display">
      <Display />
    </tabViewItem>

    <tabViewItem title="Misc">
      <Misc />
    </tabViewItem>

  </tabView>

<script>
    import Home from './components/Home.svelte';
    import CPU from './components/CPU.svelte'; 
    import GPU from './components/GPU.svelte';
    import Battery from './components/Battery.svelte'; 
    import Display from './components/Display.svelte';
    import Misc from './components/Misc.svelte';
</script>