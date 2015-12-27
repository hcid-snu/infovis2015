
Material and Methods :
두 품종의 벼 RNA-seq 데이터셋을 TRAP (http://www.ncbi.nlm.nih.gov/pubmed/24518221) 패키지로 비교 분석 후, 
통계적으로 유의한 biological pathway(P-value < 0.05)를 노드로 하는 그래프 생성.
벼 데이터는 논문에서 사용된 데이터와 동일 (온라인 데이터베이스 미등재)

TRAP의 출력 파일인 TimeSeries_edge.txt, TimeSeries_node.txt의 노드와 에지 정보를 파싱하여 JSON 파일 생성. (파싱을 위한 코드 : InfoVis_HW5.py)
이 때, 
- Node : Biological pathway
- Edge : Pathway 간 공통 유전자가 있는 경우 생성
- Edge weight : Pathway 간 공통 유전자의 개수
- Group : KEGG Database에서 제공하는 pathway의 계층 정보 이용 (kegg_hierarchy.txt)
(모든 파일은 data 폴더 내 위치)

웹페이지 상으로는 Node의 label이 pathway ID로 되어있으나, mouseover시 pathway full name 보이도록 함.
P-value 0.05 미만인 pathway만 뽑았기 때문에 legend에 있는 그룹 중 그래프에 보이지 않는 그룹이 존재.
