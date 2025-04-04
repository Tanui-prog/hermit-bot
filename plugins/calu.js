const { Function } = require('../lib/');

Function({
	pattern: 'calu ?(.*)',
	fromMe: true,
	desc: ' Calculate basic math expressions',
	type: 'misc'
}, async (message, expression) => {
  if (!expression) return await message.reply('Usage: .calu <expression>\n*Example:*\n*Addition* : .calu 2+2\n*Subtraction* : .calu 7-1\n*Multiplication* : .calu 5*3\n*Division* : .calu 8/4');
  expression = expression.replace(/\s+/g, '');

  const regex = /^(\d+(\.\d+)?)\s*([+\-*/])\s*(\d+(\.\d+)?)$/;
  const match = expression.match(regex);

  if (match) {
    const [_, num1, , operator, num2] = match;
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    switch (operator) {
      case '+':
        return await message.send(String(number1 + number2));
      case '-':
        return await message.send(String(number1 - number2));
      case '*':
        return await message.send(String(number1 * number2));
      case '/':
        if (number2 === 0) {
          return await message.reply('Division by zero');
        }
        return await message.send(String(number1 / number2));
      default:
        return await message.reply('*Unsupported operator*\n\n*Example:*\n*Addition* : .calu 2+2\n*Subtraction* : .calu 7-1\n*Multiplication* : .calu 5*3\n*Division* : .calu 8/4');
    }
  } else {
    return await message.reply('*Invalid expression*\n\n*Example:*\n*Addition* : .calu 2+2\n*Subtraction* : .calu 7-1\n*Multiplication* : .calu 5*3\n*Division* : .calu 8/4');
  }
})