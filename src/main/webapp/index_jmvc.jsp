<%
response.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);
String newLocn = "js\jmvc\3\ssc\ssc.html";
response.setHeader("Location",newLocn);
%>
