const format = async (ctx, next) => {
  const status = ctx.status;

  switch(status) {
    case 404: 
      ctx.body = {
        code: 0,
        message: 'Not Found',
        data: {
          url: ctx.originalUrl
        }
      }
      break;
    case /^(1|2|3)/.test(ctx.status):
      ctx.body = {
        code: 1,
        message: 'success',
      }
      break;
    default:
      ctx.body = {
        code: 0, 
        message: ctx.body || 'failed'
      };
      break;
  }
}

module.exports = format;