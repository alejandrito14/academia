<template>
  <div class="page">
    <div class="navbar navbar-style-1">
      <div class="navbar-bg"></div>
      <div class="navbar-inner sliding">
        <div class="left">
          <a href="#" class="link back">
            <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M4.3419 8L10.2222 2.22222L8 2.73828e-07L1.22201e-06 8L8 16L10.2222 13.7778L4.3419 8Z" fill="#122261"/>
				</svg>
            <span class="if-not-md">Back</span>
          </a>
        </div>
        <div class="title">Infinite Scroll</div>
      </div>
    </div>
    <div data-infinite-distance="50" class="page-content infinite-scroll-content" @infinite=${loadMore}>
      <div class="block-title">Scroll bottom</div>
      <div class="list simple-list">
        <ul>
          ${items.map((item, index) => $h`
          <li key=${index}>Item ${item}</li>
          `)}
        </ul>
      </div>
      ${hasMoreItems && $h`
      <div class="preloader infinite-scroll-preloader"></div>
      `}
    </div>
  </div>
</template>
<script>
  export default (props, { $, $update }) => {
    let allowInfinite = true;
    let hasMoreItems = true;
    let lastItem = 20;
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    const loadMore = () => {
      if (!allowInfinite) return;
      allowInfinite = false;

      setTimeout(function () {
        if (lastItem >= 200) {
          hasMoreItems = false;
          $update();
          return;
        }

        for (var i = 1; i <= 20; i++) {
          items.push(lastItem + i);
        }

        allowInfinite = true;
        lastItem += 20;

        $update();
      }, 1000);
    }

    return $render;

  }
</script>
