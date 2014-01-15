# add the class function to the Local Storage
Storage::setObj = (key, obj) ->
  @setItem key, JSON.stringify(obj)

Storage::getObj = (key) ->
  JSON.parse @getItem(key)

# the main application class
class TodoApp
  constructor: ->
    @cacheElements()
    @bindEvents()
    @displayItems()

  cacheElements: ->
    @$input = $('#new-todo')
    @$todoList = $('#todo-list')

  displayItems: ->
    @clearItems()
    @addItem(localStorage.getObj(id)) for id in Object.keys(localStorage)

  clearItems: ->
    @$todoList.empty()

  addItem: (item) ->
    html = """
      <li #{if item.completed then 'class="completed"' else ''} data-id="#{item.id}">
        <div class="view">
          <input class="toggle" type="checkbox" #{if item.completed then 'checked' else ''}>
          <label>#{item.title}</label>
          <button class="destroy">del</button>
        </div>
      </li>
    """
    @$todoList.append(html)

  bindEvents: ->
    @$input.on('keyup', (e) => @create(e))
    @$todoList.on('click', '.destroy', (e) => @destroy(e.target))
    @$todoList.on('change', '.toggle', (e) => @toggle(e.target))
    $('#clear-completed').click((e) => @clear(e))

  # clear-completed function
  clear: (e) ->
    #search all of items for completed todo(s) and delete from localStorage
    $('.completed').each ->
      localStorage.removeItem($(this).data("id"))
    @displayItems()

  create: (e) ->
    val = ($.trim @$input.val())
    return unless e.which == 13 and val
  
    randomId = (Math.floor Math.random()*999999)

    localStorage.setObj randomId,{
      id: randomId
      title: val
      completed: false
    }
    # cleanup the value of the input field
    @$input.val ''
    @displayItems()

  destroy: (elem) ->
    id = $(elem).closest('li').data('id')
    localStorage.removeItem(id)
    @displayItems()

  toggle: (elem) ->
    id = $(elem).closest('li').data('id')
    item = localStorage.getObj(id)
    item.completed = !item.completed
    localStorage.setObj(id, item)

# start the application by making the instance of the application class
$ ->
  app = new TodoApp()

