# GETH=geth

nodes=$1

for ((i=0;i<$nodes;++i)); do
	echo "starting up node $i"
	datadir=peer$i
	nodeint=0
	dd=$i
	port=3030$i
	rpcport=80$i
	stablelog=2
	log=peer$i.log

	init_eth="geth --exec $nodeint \
	  --datadir=$datadir \
	  init ./Genesis.json"  # comment out if you pipe it to a tty etc.

	init_cmd=$init_eth
	$init_eth

	start_eth="geth --exec $nodeint\
	  --datadir=$datadir \
	  --networkid 1244\
	  --identity="$dd" \
	  --ipcpath "$datadir/geth.ipc"\
	  --port=$port \
	  --maxpeers 130 << &"  # comment out if you pipe it to a tty etc.

	start_cmd=$start_eth
	$start_cmd
done