<% for (var i = 0, iLen = groups.length; i < iLen; i++) { %>
  <% var iTmp = groups[i].children; %>
  <article id="group-<%= i %>" class="list scroll">
    <ul>
      <%for (var j = 0, jLen = iTmp.length; j < jLen; j++) { %>
        <% var jTmp = iTmp[j]; %>
        <li class="thumb" data-forum="<%= jTmp.getAttribute('fid') %>">
          <img src="<%
            var icon = icons.map[jTmp.getAttribute('fid')];
            icon = typeof icon === 'undefined' ? 37 : icon;
            print(icons.path + '/' + icon + '.png');
          %>"/>
          <div>
            <strong><%= jTmp.getAttribute('name') %></strong>
            <span class="text tiny opacity"><%= jTmp.getAttribute('info') %></span>
          </div>
        </li>
      <% } %>
    </ul>
  </article>
<% } %>
