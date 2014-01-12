package models;

import java.util.ArrayList;
import java.util.List;

public class TestDataEntity {
	public List<Integer> LatencyData;
	
	public TestDataEntity() {
		LatencyData = new ArrayList<Integer>();
	}

	public List<Integer> getLatencyData() {
		return LatencyData;
	}

	public void setLatencyData(List<Integer> latencyData) {
		LatencyData = latencyData;
	}
	
	public boolean equals(TestDataEntity entity) {
		if(entity.LatencyData.size() != this.LatencyData.size()) {
			return false;
		}
		
		for(int i = 0; i < this.LatencyData.size(); i++) {
			if(this.LatencyData.get(i) != entity.LatencyData.get(i)) {
				return false;
			}
		}
		
		return true;
	}
}
