<%
var root = topic.children[0]; 
var replies = root.getElementsByTagName('__T')[0].getElementsByTagName('replies')[0].textContent; 
var rowsPerPage = root.getElementsByTagName('__R__ROWS_PAGE')[0].textContent;
var pagination = $pagination(page, replies, rowsPerPage);
%>
      <nav>
        <% for (var i = 0, len = pagination.length; i < len; i++) { %>
          <a href="#" class="<% print(pagination[i] === page ? 'active' : ''); %>"><%= pagination[i] %></a>
        <% } %>
      </nav>