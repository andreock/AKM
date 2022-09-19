<tabView selectedIndex="{selectedIndex}" on:selectedIndexChange="{indexChange}">
    <tabViewItem title="Summary">
      <Home />
    </tabViewItem>
  
    <tabViewItem title="CPU">
      <label text="Content for Tab 2" />
    </tabViewItem>
  </tabView>

<script>
    import Home from './components/Home.svelte'
    let selectedIndex;
    function indexChange(event) {
        let newIndex = event.value
        console.log('Current tab index: ' + newIndex)
    }
</script>