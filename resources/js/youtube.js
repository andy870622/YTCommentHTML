function authenticate() {
	// 認證之 youtube 會員必須是有頻道的
	return gapi.auth2.getAuthInstance()
		.signIn({ scope: 'https://www.googleapis.com/auth/youtube.force-ssl' })
		.then(
			function () {
				console.log('Sign-in successful')
				loadClient()
			},
			function (err) {
				console.error('Error signing in', err)
			}
		)
}
function loadClient() {
	gapi.client.setApiKey('AIzaSyA2VC6hQ7HpJpOrLefQA-5bqvhKol3UTs4')
	return gapi.client
		.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
		.then(
			function () {
				console.log('GAPI client loaded for API')
				Swal.fire({
					title: '留言',
					input: 'text',
					showCancelButton: true,
					confirmButtonText: '上傳',
					preConfirm: (text) => {
						execute(text)
					}
				})
			},
			function (err) {
				console.error('Error loading GAPI client for API', err)
			}
		)
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute(text) {
  let videoId = localStorage.getItem("videoId");
	return gapi.client.youtube.commentThreads
		.insert({
			part: ['snippet'],
			resource: {
				snippet: {
					videoId: videoId,
					topLevelComment: {
						snippet: {
							textOriginal: text
						}
					}
				}
			}
		})
		.then(
			function (response) {
				// Handle the results here (response.result has the parsed body).
				console.log('Response', response)
			},
			function (err) {
				console.error('Execute error', err)
			}
		)
}

gapi.load("client:auth2", function() {
  gapi.auth2.init({client_id: "179500870793-1htoga6ikmpi5is7634gade8do2gvrpl.apps.googleusercontent.com"});
});
