package com.immigration.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatisticsDTO {
    private long total;
    private long active;
    private long exited;
    private long overstay;
    private long critical;
}
