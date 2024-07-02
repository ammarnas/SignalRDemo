using Microsoft.AspNetCore.SignalR;

namespace SignalRDemo.Hubs
{
    public class MyHub: Hub
    {
        public async Task AskServer(string clientText)
        {
            string tempString = string.Empty;

            if(clientText == "hey")
            {
                tempString = "message was 'hey'";
            }
            else
            {
                tempString = "message was something else";
            }

            await Clients.Clients(this.Context.ConnectionId).SendAsync("askServerResponse", tempString);
        }
    }
}
