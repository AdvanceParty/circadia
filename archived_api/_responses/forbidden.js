const forbidden = res => {
  res.status(403);
  res.json({ body: `You don't have permission to view this shit.` });
};

export { forbidden };
