// a kind of hierachy of the block, process if you want
[
  {
    block: Message,
    children: [
      {
        block: Content
      },
      {
        block: SomethingElse
      }
    ]
  },
  {
    block: SendMessage,
    children: [
      {
        block: SomeBlock
      }
    ]
  }
];
