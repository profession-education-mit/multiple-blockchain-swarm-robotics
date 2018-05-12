
nodes=$1

for ((i=0;i<$nodes;++i)); do
  start_eth="geth --datadir="/tmp/eth/60/0$i" --ipcdisable --port 3031$i --rpcport 810$i console 2>> /tmp/eth/60/0$i.log"
  echo "start_eth is $start_eth"
  start_cmd=$start_eth
  $start_cmd
done