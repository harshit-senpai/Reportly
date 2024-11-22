export const POST = async (req: Request, res: Response) => {
  const { base64 } = await req.json();
  console.log(base64);
};
