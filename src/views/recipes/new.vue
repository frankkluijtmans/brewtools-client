<template>
  <div class="recipes">
    <h1 class="PageTitle">New recipe</h1>
    <form method="post" action="http://localhost:3000/insert">
      <input type="text" name="name">
      <input type="submit" value="send">
    </form>
  </div>
</template>
