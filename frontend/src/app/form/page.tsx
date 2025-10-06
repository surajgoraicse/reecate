const page = () => {
	const val = true;
	return (
		<div className="flex ">
			<div className="w-40 h-40 border order-2">3</div>
			<div className="w-40 h-40 border order-3">2</div>
			{val && <div className="w-40 h-40 border order-1 ">1</div>}
		</div>
	);
};

export default page;
