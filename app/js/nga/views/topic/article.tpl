<ul>
  <% var root = topic.children[0]; %>
  <% var floor = root.getElementsByTagName('__R')[0].getElementsByTagName('item'); %>
  <% for (var i = 0, len = floor.length; i < len; i++) { %>
    <% var tmp = floor[i]; %>
    <li class="thumb" data-floor="<%= $get($first(tmp.getElementsByTagName('pid')), 'textContent') %>">
      <% avatar = $get(userInfo[$get($first(tmp.getElementsByTagName('authorid')), 'textContent')], 'avatar') || 'http://img4.ngacn.cc/ngabbs/nga_classic/f/0.png'; %>
      <img src="<%= avatar %>" />
      <div>
        <div class="on-right"><%= $get($first(tmp.getElementsByTagName('lou')), 'textContent') %>楼</div>
        <% if (tmp.getElementsByTagName('subject')) { %>
          <strong class="text bold"><%= $get($first(tmp.getElementsByTagName('subject')), 'textContent') %></strong>
        <% } %>
        <span class="text small"><%== $get($first(tmp.getElementsByTagName('content')), 'textContent') %></span>
        <small><%= userInfo[$get($first(tmp.getElementsByTagName('authorid')), 'textContent')].username %> <%= $format_date($get($first(tmp.getElementsByTagName('postdatetimestamp')), 'textContent')) %></small>
      </div>
    </li>
  <% } %>
</ul>
