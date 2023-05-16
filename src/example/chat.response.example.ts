// ==========

export const successToSendChatResponse = {
  code: 200,
  message: 'Message is sent successfully',
  result: {
    message: 'Hello'
  }
}

export const failedToSendChatResponse = {
  code: 400,
  message: 'Failed to sent message'
}

export const successToGetChatListsResponse = {
  code: 200,
  message: 'Success get chat lists',
  results: [
    {
      _id: '6463622dbb94754526756300',
      senderAccount: {
        _id: '6463622dbb94754526756301',
        name: 'Jhon'
      },
      receiverAccount: {
        _id: '6463622dbb94754526756401',
        name: 'Alvin'
      },
      chat: 'Hi',
      createdAt: '2023-02-21'
    }
  ]
}

export const failedToGetChatListsResponse = {
  code: 400,
  message: 'Failed to get chat lists'
}
