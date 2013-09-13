<ul>
  <% var root = forum.children[0]; %>
  <% var topic = root.getElementsByTagName('__T')[0].getElementsByTagName('item'); %>
  <% for (var i = 0, len = topic.length; i < len; i++) { %>
    <% var tmp = topic[i]; %>
    <li class="thumb" data-topic="<%= tmp.getElementsByTagName('tid')[0].textContent %>" data-count="123">
      <%= tmp.getElementsByTagName('replies')[0].textContent %>
      <div>
        <div class="on-right"><%= $format_date(tmp.getElementsByTagName('lastpost')[0].textContent) %></div>
        <strong><%= tmp.getElementsByTagName('subject')[0].textContent %></strong>
        <span class="text tiny opacity"><%= tmp.getElementsByTagName('author')[0].textContent %></span>
        <div class="on-right"><%= tmp.getElementsByTagName('lastposter')[0].textContent %></div>
      </div>
    </li>
  <% } %>
</ul>
