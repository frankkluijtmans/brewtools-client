<template>
  <div>
    <h1 class="PageTitle">Your recipes</h1>
    <div class="OverviewTable">
      <header>Your recipes (16 recipes)</header>
      <div class="TableRow TableHeader">
        <span>Recipe <i class="fas fa-sort"></i></span>
        <span>Style <i class="fas fa-sort"></i></span>
        <span>Brewery <i class="fas fa-sort"></i></span>
        <span>Last edited <i class="fas fa-sort"></i></span>
        <span></span>
      </div>
      <router-link to="/recipes/detail/1" class="TableRow">
        <span>Triple Nipple</span>
        <span>Belgian triple</span>
        <span>The Monkey Brewery</span>
        <span>April 25th, 2018</span>
        <span class="Buttons">
          <router-link to="/recipes/edit/1" class="Button Edit"><i class="fas fa-edit"></i> Edit</router-link>
          <a class="Button Delete"><i class="fas fa-trash"></i> Delete</a>
        </span>
      </router-link>
      <router-link to="/recipes/detail/1" class="TableRow">
        <span>Fat basterd</span>
        <span>Belgian quadruple</span>
        <span>The Monkey Brewery</span>
        <span>April 25th, 2018</span>
        <span class="Buttons">
          <router-link to="/recipes/edit/1" class="Button Edit"><i class="fas fa-edit"></i> Edit</router-link>
          <a class="Button Delete"><i class="fas fa-trash"></i> Delete</a>
        </span>
      </router-link>
      <router-link to="/recipes/detail/1" class="TableRow">
        <span>Zwarte pint</span>
        <span>Russian imperial stout</span>
        <span>The Monkey Brewery</span>
        <span>April 25th, 2018</span>
        <span class="Buttons">
          <router-link to="/recipes/edit/1" class="Button Edit"><i class="fas fa-edit"></i> Edit</router-link>
          <a class="Button Delete"><i class="fas fa-trash"></i> Delete</a>
        </span>
      </router-link>
      <router-link to="/recipes/detail/1" class="TableRow">
        <span>Y.I.P.A. (It's fun to stay at the)</span>
        <span>India pale ale</span>
        <span>The Monkey Brewery</span>
        <span>April 25th, 2018</span>
        <span class="Buttons">
          <router-link to="/recipes/edit/1" class="Button Edit"><i class="fas fa-edit"></i> Edit</router-link>
          <a class="Button Delete"><i class="fas fa-trash"></i> Delete</a>
        </span>
      </router-link>
      <footer>
        <router-link to="/recipes/new" class="Button New"><i class="fas fa-plus"></i> Create a new recipe</router-link>
      </footer>
    </div>
  </div>
</template>

<style lang="scss">
  @import '../../styles/_tables';
</style>