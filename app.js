let state = {
  items: {'apples': false, 'oranges': false, 'milk': true, 'bread': false}
};

function addItem(state, item) {
  state.items[item] = false;
};

function removeItem(state, item) {
  delete state.items[item];
};

function toggleCheck(state, item) {
  state.items[item] = !state.items[item];
};

function renderItem(state, item){
  if(state.items[item]){
  return `<li>
    <span class="shopping-item shopping-item__checked">${item}</span>
    <div class="shopping-item-controls">
      <button class="shopping-item-toggle">
        <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete">
        <span class="button-label">delete</span>
      </button>
    </div>
  </li>`
  }
  else{
    return `<li>
      <span class="shopping-item">${item}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle">
          <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
    </li>`
  }
};

function renderList(state, list) {
  let list_innerHTML= "";
  Object.keys(state.items).forEach(function(item) {
    list_innerHTML += renderItem(state, item);
  })
  list.html(list_innerHTML);
};

function doThings(){
  console.log(state);
  const shoppingList = $('.shopping-list');
  $('ul').on('click', '.shopping-item-toggle', function(event){
    console.log(state);
    let item = $(this).parent().parent().find('.shopping-item').text();
    toggleCheck(state, item);
    renderList(state, shoppingList);
  });

  $('ul').on('click', '.shopping-item-delete', function(event){
    let item = $(this).parent().parent().find('.shopping-item').text();
    removeItem(state, item);
    renderList(state, shoppingList);
  });

  $("#js-shopping-list-form").submit(function(event){
    event.preventDefault();
    let item = $(this).find('#shopping-list-entry').val();
    $(this).find('#shopping-list-entry').val('');
    addItem(state, item);
    renderList(state, shoppingList);
  })
};



$(function() {
  doThings();
});
