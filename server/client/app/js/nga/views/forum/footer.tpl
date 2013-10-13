<%
var root = forum.children[0]; 
var replies = root.getElementsByTagName('__ROWS')[0].textContent; 
var rowsPerPage = root.getElementsByTagName('__T__ROWS_PAGE')[0].textContent;
var pagination = $pagination(page, replies, rowsPerPage);
%>
      <nav>
        <% for (var i = 0, len = pagination.length; i < len; i++) { %>
          <a href="#" class="<% print(pagination[i] === page ? 'active' : ''); %>"><%= pagination[i] %></a>
        <% } %>
      </nav>